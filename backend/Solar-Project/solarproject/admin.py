from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import UserProfile, PessoaFisica, PessoaJuridica


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Perfis'


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')
    list_filter = ('role',)


# Extend UserAdmin to include UserProfile
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


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