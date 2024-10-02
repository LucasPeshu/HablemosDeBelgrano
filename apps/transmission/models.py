from django.db import models

# Create your models here.
class Transmission(models.Model):
  class Meta:
    verbose_name = 'Transmission'
    verbose_name_plural = 'Transmissions'
  
  link = models.CharField(max_length=255, unique=True)

  def __str__(self):
    return self.link