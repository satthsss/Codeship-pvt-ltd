from django.db import models


class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    company = models.CharField(max_length=100)
    native = models.CharField(max_length=100)

    def __str__(self):
        return self.name