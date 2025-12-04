from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PessoaFisicaViewSet, PessoaJuridicaViewSet, UserViewSet, CustomAuthToken

router = DefaultRouter()
router.register(r'pessoas-fisicas', PessoaFisicaViewSet, basename='pessoafisica')
router.register(r'pessoas-juridicas', PessoaJuridicaViewSet, basename='pessoajuridica')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserViewSet.as_view({'post': 'register'}), name='user-register'),
    path('login/', CustomAuthToken.as_view(), name='api-login'),
]