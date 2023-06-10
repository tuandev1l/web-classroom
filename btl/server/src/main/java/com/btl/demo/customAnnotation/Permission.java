package com.btl.demo.customAnnotation;

import com.btl.demo.enums.Role;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Permission {
  String role() default Role.Constants.ADMIN_VALUE;
}
