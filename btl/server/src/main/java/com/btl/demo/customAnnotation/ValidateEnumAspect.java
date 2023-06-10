package com.btl.demo.customAnnotation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class ValidateEnumAspect implements ConstraintValidator<ValidateEnum,
    String> {
  //  @Around("@annotation(ValidateEnum)")
  //  public Object validateEnum(ProceedingJoinPoint joinPoint) throws Throwable {
  //    log.warn("im here");
  //    //    ValidateEnum value =
  //    //        ((MethodSignature) joinPoint.getSignature()).getMethod().getAnnotation(ValidateEnum.class);
  //    //    log.warn(value.toString());
  //    //    List<String> statuses =
  //    //        Stream.of(Status.class.getEnumConstants()).map(Enum::toString).toList();
  //    //    log.warn(statuses.toString());
  //    //    String status = joinPoint.getArgs()[0].toString();
  //    //    if (!statuses.contains(status)) {
  //    //      throw new InvalidException(String.format("Status only %s not %s",
  //    //          statuses, status));
  //    //    }
  //    return joinPoint.proceed();

  @Override
  public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
    log.warn(s);
    return false;
  }
}
