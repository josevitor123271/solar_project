from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import PessoaFisica, PessoaJuridica, UserProfile
from .serializers import PessoaFisicaSerializer, PessoaJuridicaSerializer, RegisterUserSerializer


class PessoaFisicaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Pessoas Físicas.
    
    list: Retorna lista de todas as pessoas físicas
    create: Cria uma nova pessoa física
    retrieve: Retorna detalhes de uma pessoa física específica
    update: Atualiza uma pessoa física
    partial_update: Atualiza parcialmente uma pessoa física
    destroy: Deleta uma pessoa física
    """
    queryset = PessoaFisica.objects.all()
    serializer_class = PessoaFisicaSerializer


class PessoaJuridicaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Pessoas Jurídicas.
    
    list: Retorna lista de todas as pessoas jurídicas
    create: Cria uma nova pessoa jurídica
    retrieve: Retorna detalhes de uma pessoa jurídica específica
    update: Atualiza uma pessoa jurídica
    partial_update: Atualiza parcialmente uma pessoa jurídica
    destroy: Deleta uma pessoa jurídica
    """
    queryset = PessoaJuridica.objects.all()
    serializer_class = PessoaJuridicaSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Usuários.
    """
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        """
        Endpoint para registro de novos usuários.
        """
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.create(serializer.validated_data)
            # Obter o role do UserProfile
            try:
                user_profile = user.userprofile
                role = user_profile.role
            except UserProfile.DoesNotExist:
                role = 'PF'  # Default role
            
            return Response({
                'message': 'Usuário registrado com sucesso',
                'user_id': user.id,
                'username': user.username,
                'role': role
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)