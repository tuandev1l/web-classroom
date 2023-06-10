package com.btl.demo.enums;

public enum Role {
  USER(Constants.USER_VALUE), ADMIN(Constants.ADMIN_VALUE);

  Role(String roleString) {
  }

  public static class Constants {
    public static final String USER_VALUE = "USER";
    public static final String ADMIN_VALUE = "ADMIN";
  }

}
