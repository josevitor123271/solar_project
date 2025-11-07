from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PessoaFisicaViewSet, PessoaJuridicaViewSet

router = DefaultRouter()
router.register(r'pessoas-fisicas', PessoaFisicaViewSet, basename='pessoafisica')
router.register(r'pessoas-juridicas', PessoaJuridicaViewSet, basename='pessoajuridica')

urlpatterns = [
    path('', include(router.urls)),
]

