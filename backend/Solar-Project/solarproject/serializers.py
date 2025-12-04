from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from .models import UserProfile, PessoaFisica, PessoaJuridica


class PessoaFisicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PessoaFisica
        fields = '__all__' # Todos os campos do modelo PessoaFisica


class PessoaJuridicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PessoaJuridica
        fields = '__all__' # Todos os campos do modelo PessoaJuridica


class UserProfileSerializer(serializers.ModelSerializer):
    pessoa_fisica = PessoaFisicaSerializer(read_only=True)
    pessoa_juridica = PessoaJuridicaSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'pessoa_fisica', 'pessoa_juridica']


class RegisterUserSerializer(serializers.ModelSerializer):
    pessoa_fisica = PessoaFisicaSerializer(required=False)
    pessoa_juridica = PessoaJuridicaSerializer(required=False)
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=UserProfile.Role.choices, default=UserProfile.Role.CLIENT_PF, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'role', 'pessoa_fisica', 'pessoa_juridica']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    @transaction.atomic
    def create(self, validated_data):
        pf_data = validated_data.pop('pessoa_fisica', None)
        pj_data = validated_data.pop('pessoa_juridica', None)
        password = validated_data.pop('password')
        role = validated_data.pop('role', UserProfile.Role.CLIENT_PF)  # Default to CLIENT_PF

        # Cria o usuário base
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        
        # Cria o perfil do usuário
        user_profile = UserProfile.objects.create(user=user, role=role)
        
        # Se for Admin, já damos poderes de staff
        if role == UserProfile.Role.ADMIN:
            user.is_staff = True
            user.is_superuser = True  # Opcional, depende da regra de negócio
            user.save()
            # E ACABOU AQUI! Não criamos PessoaFisica para ele.
            return user

        # Lógica de Clientes (PF/PJ) continua igual...
        if role == UserProfile.Role.CLIENT_PF and pf_data:
            # Cria PessoaFisica
            pf_data['user'] = user
            PessoaFisica.objects.create(**pf_data)
        elif role == UserProfile.Role.CLIENT_PJ and pj_data:
            # Cria PessoaJuridica
            pj_data['user'] = user
            PessoaJuridica.objects.create(**pj_data)

        return user