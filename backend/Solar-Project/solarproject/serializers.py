from rest_framework import serializers
from .models import PessoaFisica, PessoaJuridica


class PessoaFisicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PessoaFisica
        fields = '__all__' # Todos os campos do modelo PessoaFisica


class PessoaJuridicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PessoaJuridica
        fields = '__all__' # Todos os campos do modelo PessoaJuridica

