from django.contrib import admin
from .models import PessoaFisica, PessoaJuridica


@admin.register(PessoaFisica)
class PessoaFisicaAdmin(admin.ModelAdmin):
    list_display = ('nome_completo', 'cpf', 'email', 'telefone_principal', 'cidade', 'estado')
    list_filter = ('estado', 'cidade')
    search_fields = ('nome_completo', 'cpf', 'email')
    readonly_fields = ('id',)


@admin.register(PessoaJuridica)
class PessoaJuridicaAdmin(admin.ModelAdmin):
    list_display = ('razao_social', 'nome_fantasia', 'cnpj', 'email_comercial', 'telefone_principal', 'estado')
    list_filter = ('estado',)
    search_fields = ('razao_social', 'nome_fantasia', 'cnpj', 'email_comercial')
    readonly_fields = ('id',)

