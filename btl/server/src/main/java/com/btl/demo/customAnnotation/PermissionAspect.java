package com.btl.demo.customAnnotation;

import com.btl.demo.exception.PermissionException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Aspect
@Component
@Slf4j
public class PermissionAspect {
  @Around("@annotation(Permission)")
  public Object permission(ProceedingJoinPoint joinPoint) throws Throwable {
    // get info of user logged in
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    // get permission from annotation
    Permission permission =
        ((MethodSignature) joinPoint.getSignature()).getMethod().getAnnotation(Permission.class);

    List<String> authorities = new ArrayList<>();
    for (GrantedAuthority grantedAuthority : auth.getAuthorities()) {
      authorities.add(String.valueOf(grantedAuthority));
    }
    if (authorities.contains(permission.role())) {
      return joinPoint.proceed();
    } else {
      throw new PermissionException("You do not have permission to do that");
    }
  }
}
