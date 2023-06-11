package com.btl.demo.controller;

import com.btl.demo.dtos.stripe.StripeDto;
import com.btl.demo.entity.StripeE;
import com.btl.demo.service.StripeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stripe")
@RequiredArgsConstructor
public class StripeController {
  private final StripeService stripeService;

  @PostMapping("")
  public StripeE clientSecretCreate(@Valid @RequestBody StripeDto stripeDto) {
    return this.stripeService.clientSecretCreate(stripeDto);
  }
}
