from django.db import models
from django.contrib.auth.models import User
from datetime import date

class Transaction(models.Model):

    CATEGORY_CHOICES = [
        ('Booking For Transport', 'Booking For Transport'),
        ('Bill Payment', 'Bill Payment'),
        ('Recharge', 'Recharge'),
        ('Fund Transfer', 'Fund Transfer'),
        ('Purchase E-commerce', 'Purchase E-commerce'),
    ]

    METHOD_CHOICES = [
        ('UPI', 'UPI'),
        ('Credit Card', 'Credit Card'),
        ('Debit Card', 'Debit Card'),
        ('Wallet', 'Wallet'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    subcategory = models.CharField(max_length=100, blank=True, null=True)  
    payment_method = models.CharField(max_length=50)
    amount = models.FloatField()
    date_time = models.DateTimeField(auto_now_add=True)

    # Optional fields
    source = models.CharField(max_length=255, blank=True, null=True)
    destination = models.CharField(max_length=255, blank=True, null=True)
    customer_id = models.CharField(max_length=100, blank=True, null=True)
    electricity_supplier = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    # New fields to match frontend payload
    account_number = models.CharField(max_length=100, blank=True, null=True)
    bank_name = models.CharField(max_length=100, blank=True, null=True)
    ifsc_code = models.CharField(max_length=20, blank=True, null=True)
    item_name = models.CharField(max_length=255, blank=True, null=True)
    network_name = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.category} - ₹{self.amount} on {self.date_time.strftime('%Y-%m-%d %H:%M')}"


class DueNotification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="due_notifications")
    title = models.CharField(max_length=100)
    due_date = models.DateField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    is_paid = models.BooleanField(default=False)

    def is_overdue(self):
        return not self.is_paid and self.due_date < date.today()

    def __str__(self):
        status = "PAID" if self.is_paid else "DUE"
        return f"{self.title} - ₹{self.amount} on {self.due_date} ({status})"


class EcommerceTransaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ecommerce_transactions")
    item_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} x{self.quantity} - ₹{self.amount} on {self.purchase_date.strftime('%Y-%m-%d')}"
