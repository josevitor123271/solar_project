from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import PessoaFisica, PessoaJuridica
from .serializers import PessoaFisicaSerializer, PessoaJuridicaSerializer


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

