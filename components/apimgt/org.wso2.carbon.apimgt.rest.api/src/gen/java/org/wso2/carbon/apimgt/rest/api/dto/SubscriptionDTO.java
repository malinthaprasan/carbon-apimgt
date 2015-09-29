package org.wso2.carbon.apimgt.rest.api.dto;

import java.math.BigDecimal;

import io.swagger.annotations.*;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;



@ApiModel(description = "")
public class SubscriptionDTO  {
  
  
  @NotNull
  private BigDecimal subscriptionId = null;
  
  
  private Integer applicationId = null;
  
  
  private String apiId = null;
  
  
  private String tier = null;
  
  
  private String status = null;

  
  /**
   **/
  @ApiModelProperty(required = true, value = "")
  @JsonProperty("subscriptionId")
  public BigDecimal getSubscriptionId() {
    return subscriptionId;
  }
  public void setSubscriptionId(BigDecimal subscriptionId) {
    this.subscriptionId = subscriptionId;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("applicationId")
  public Integer getApplicationId() {
    return applicationId;
  }
  public void setApplicationId(Integer applicationId) {
    this.applicationId = applicationId;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("apiId")
  public String getApiId() {
    return apiId;
  }
  public void setApiId(String apiId) {
    this.apiId = apiId;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("tier")
  public String getTier() {
    return tier;
  }
  public void setTier(String tier) {
    this.tier = tier;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("status")
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }

  

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class SubscriptionDTO {\n");
    
    sb.append("  subscriptionId: ").append(subscriptionId).append("\n");
    sb.append("  applicationId: ").append(applicationId).append("\n");
    sb.append("  apiId: ").append(apiId).append("\n");
    sb.append("  tier: ").append(tier).append("\n");
    sb.append("  status: ").append(status).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
