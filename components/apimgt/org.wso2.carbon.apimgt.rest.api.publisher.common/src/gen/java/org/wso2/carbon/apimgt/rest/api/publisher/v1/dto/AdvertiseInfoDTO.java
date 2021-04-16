package org.wso2.carbon.apimgt.rest.api.publisher.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;


import io.swagger.annotations.*;
import java.util.Objects;

import javax.xml.bind.annotation.*;
import org.wso2.carbon.apimgt.rest.api.common.annotations.Scope;
import com.fasterxml.jackson.annotation.JsonCreator;

import javax.validation.Valid;



public class AdvertiseInfoDTO   {
  
    private Boolean advertised = null;
    private String originalDevPortalUrl = null;
    private String apiOwner = null;

    @XmlType(name="VendorEnum")
    @XmlEnum(String.class)
    public enum VendorEnum {
        WSO2("WSO2"),
        AWS("AWS");
        private String value;

        VendorEnum (String v) {
            value = v;
        }

        public String value() {
            return value;
        }

        @Override
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static VendorEnum fromValue(String v) {
            for (VendorEnum b : VendorEnum.values()) {
                if (String.valueOf(b.value).equals(v)) {
                    return b;
                }
            }
return null;
        }
    }
    private VendorEnum vendor = VendorEnum.WSO2;

  /**
   **/
  public AdvertiseInfoDTO advertised(Boolean advertised) {
    this.advertised = advertised;
    return this;
  }

  
  @ApiModelProperty(example = "true", value = "")
  @JsonProperty("advertised")
  public Boolean isAdvertised() {
    return advertised;
  }
  public void setAdvertised(Boolean advertised) {
    this.advertised = advertised;
  }

  /**
   **/
  public AdvertiseInfoDTO originalDevPortalUrl(String originalDevPortalUrl) {
    this.originalDevPortalUrl = originalDevPortalUrl;
    return this;
  }

  
  @ApiModelProperty(example = "https://localhost:9443/devportal", value = "")
  @JsonProperty("originalDevPortalUrl")
  public String getOriginalDevPortalUrl() {
    return originalDevPortalUrl;
  }
  public void setOriginalDevPortalUrl(String originalDevPortalUrl) {
    this.originalDevPortalUrl = originalDevPortalUrl;
  }

  /**
   **/
  public AdvertiseInfoDTO apiOwner(String apiOwner) {
    this.apiOwner = apiOwner;
    return this;
  }

  
  @ApiModelProperty(example = "admin", value = "")
  @JsonProperty("apiOwner")
  public String getApiOwner() {
    return apiOwner;
  }
  public void setApiOwner(String apiOwner) {
    this.apiOwner = apiOwner;
  }

  /**
   **/
  public AdvertiseInfoDTO vendor(VendorEnum vendor) {
    this.vendor = vendor;
    return this;
  }

  
  @ApiModelProperty(value = "")
  @JsonProperty("vendor")
  public VendorEnum getVendor() {
    return vendor;
  }
  public void setVendor(VendorEnum vendor) {
    this.vendor = vendor;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AdvertiseInfoDTO advertiseInfo = (AdvertiseInfoDTO) o;
    return Objects.equals(advertised, advertiseInfo.advertised) &&
        Objects.equals(originalDevPortalUrl, advertiseInfo.originalDevPortalUrl) &&
        Objects.equals(apiOwner, advertiseInfo.apiOwner) &&
        Objects.equals(vendor, advertiseInfo.vendor);
  }

  @Override
  public int hashCode() {
    return Objects.hash(advertised, originalDevPortalUrl, apiOwner, vendor);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AdvertiseInfoDTO {\n");
    
    sb.append("    advertised: ").append(toIndentedString(advertised)).append("\n");
    sb.append("    originalDevPortalUrl: ").append(toIndentedString(originalDevPortalUrl)).append("\n");
    sb.append("    apiOwner: ").append(toIndentedString(apiOwner)).append("\n");
    sb.append("    vendor: ").append(toIndentedString(vendor)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

