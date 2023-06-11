package com.btl.demo.service;

import com.btl.demo.dtos.stripe.StripeDto;
import com.btl.demo.entity.StripeE;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripeService {
  public StripeE clientSecretCreate(StripeDto stripeDto) {
    Stripe.apiKey =
        "sk_test_51NHL0vIcrSBhhh7hcFMqizyzgakNBWtK2SSbUJ6g66FQEGrHjNXCVzFZmg3Y4bbuf4VTO7Q7pcm9wADP84NvExu300kx21qkZq";

    PaymentIntentCreateParams params =
        PaymentIntentCreateParams.builder()
            .setAmount(stripeDto.getAmount())
            .setCurrency("vnd").
            setDescription(stripeDto.getDescription())
            .setAutomaticPaymentMethods(
                PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
            )
            .build();

    PaymentIntent paymentIntent;
    {
      try {
        paymentIntent = PaymentIntent.create(params);
        StripeE stripeE = new StripeE();
        stripeE.setClientSecret(paymentIntent.getClientSecret());
        return stripeE;
      } catch (StripeException e) {
        throw new RuntimeException(e);
      }
    }
  }
}
