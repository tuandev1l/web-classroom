package com.btl.demo.customAnnotation;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class SkipAuthAspect {
  @Around("@annotation(SkipAuth)")
  public void skipAuth(ProceedingJoinPoint joinPoint) throws Throwable {
  }
}
