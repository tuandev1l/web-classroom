package com.btl.demo.customAnnotation;

import com.btl.demo.exception.InvalidException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class IdValidatorAspect {
  @Around("@annotation(ValidId)")
  public Object idValidator(ProceedingJoinPoint joinPoint) throws Throwable {
    try {
      log.warn("What??");
      long id = Long.parseLong(joinPoint.getArgs()[0].toString());
      if (id > 0) return joinPoint.proceed();
    } catch (Exception e) {
      ValidId validId =
          ((MethodSignature) joinPoint.getSignature()).getMethod().getAnnotation(ValidId.class);
      throw new InvalidException(validId.message());
    }
    return joinPoint.proceed();
  }
}
