from django.db import models
from django.core.validators import RegexValidator


# Estados brasileiros
ESTADOS_CHOICES = [
    ('AC', 'Acre'),
    ('AL', 'Alagoas'),
    ('AP', 'Amapá'),
    ('AM', 'Amazonas'),
    ('BA', 'Bahia'),
    ('CE', 'Ceará'),
    ('DF', 'Distrito Federal'),
    ('ES', 'Espírito Santo'),
    ('GO', 'Goiás'),
    ('MA', 'Maranhão'),
    ('MT', 'Mato Grosso'),
    ('MS', 'Mato Grosso do Sul'),
    ('MG', 'Minas Gerais'),
    ('PA', 'Pará'),
    ('PB', 'Paraíba'),
    ('PR', 'Paraná'),
    ('PE', 'Pernambuco'),
    ('PI', 'Piauí'),
    ('RJ', 'Rio de Janeiro'),
    ('RN', 'Rio Grande do Norte'),
    ('RS', 'Rio Grande do Sul'),
    ('RO', 'Rondônia'),
    ('RR', 'Roraima'),
    ('SC', 'Santa Catarina'),
    ('SP', 'São Paulo'),
    ('SE', 'Sergipe'),
    ('TO', 'Tocantins'),
]


class PessoaFisica(models.Model):
    """Modelo para Pessoa Física"""
    cpf = models.CharField(
        max_length=11,
        unique=True,
        validators=[RegexValidator(regex=r'^\d{11}$', message='CPF deve conter exatamente 11 dígitos numéricos')]
    )
    nome_completo = models.CharField(max_length=150)
    data_nascimento = models.DateField()
    rg = models.CharField(max_length=20)
    email = models.EmailField(max_length=150)
    telefone_principal = models.CharField(max_length=15)
    cep = models.CharField(
        max_length=8,
        validators=[RegexValidator(regex=r'^\d{8}$', message='CEP deve conter exatamente 8 dígitos numéricos')]
    )
    logradouro = models.CharField(max_length=150)
    numero = models.CharField(max_length=10)
    bairro = models.CharField(max_length=80)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=2, choices=ESTADOS_CHOICES)
    pais = models.CharField(max_length=50, default='Brasil')
    complemento = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name = 'Pessoa Física'
        verbose_name_plural = 'Pessoas Físicas'
        ordering = ['nome_completo']

    def __str__(self):
        return f'{self.nome_completo} - {self.cpf}'


class PessoaJuridica(models.Model):
    """Modelo para Pessoa Jurídica"""
    cnpj = models.CharField(
        max_length=14,
        unique=True,
        validators=[RegexValidator(regex=r'^\d{14}$', message='CNPJ deve conter exatamente 14 dígitos numéricos')]
    )
    razao_social = models.CharField(max_length=150)
    nome_fantasia = models.CharField(max_length=150)
    data_abertura = models.DateField()
    email_comercial = models.EmailField(max_length=150)
    telefone_principal = models.CharField(max_length=15)
    inscricao_estadual = models.CharField(max_length=20)
    site = models.URLField(max_length=150, blank=True, null=True)
    complemento = models.CharField(max_length=50, blank=True, null=True)
    logradouro = models.CharField(max_length=150)
    bairro = models.CharField(max_length=80)
    estado = models.CharField(max_length=2, choices=ESTADOS_CHOICES)
    numero = models.CharField(max_length=10)
    pais = models.CharField(max_length=50, default='Brasil')

    class Meta:
        verbose_name = 'Pessoa Jurídica'
        verbose_name_plural = 'Pessoas Jurídicas'
        ordering = ['razao_social']

    def __str__(self):
        return f'{self.razao_social} - {self.cnpj}'

