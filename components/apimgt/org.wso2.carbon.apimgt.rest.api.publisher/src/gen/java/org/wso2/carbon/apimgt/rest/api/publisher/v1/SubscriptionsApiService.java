package org.wso2.carbon.apimgt.rest.api.publisher;

import org.wso2.carbon.apimgt.rest.api.publisher.*;
import org.wso2.carbon.apimgt.rest.api.publisher.dto.*;

import org.apache.cxf.jaxrs.ext.MessageContext;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.Multipart;

import org.wso2.carbon.apimgt.api.APIManagementException;

import org.wso2.carbon.apimgt.rest.api.publisher.dto.APIMonetizationUsageDTO;
import org.wso2.carbon.apimgt.rest.api.publisher.dto.ErrorDTO;
import org.wso2.carbon.apimgt.rest.api.publisher.dto.SubscriberInfoDTO;
import org.wso2.carbon.apimgt.rest.api.publisher.dto.SubscriptionListDTO;

import java.util.List;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;


public interface SubscriptionsApiService {
      public Response blockSubscription(String subscriptionId, String blockState, String ifMatch, MessageContext messageContext) throws APIManagementException;
      public Response getSubscriberInfoBySubscriptionId(String subscriptionId, MessageContext messageContext) throws APIManagementException;
      public Response getSubscriptionUsage(String subscriptionId, MessageContext messageContext) throws APIManagementException;
      public Response getSubscriptions(String apiId, Integer limit, Integer offset, String ifNoneMatch, String query, MessageContext messageContext) throws APIManagementException;
      public Response unBlockSubscription(String subscriptionId, String ifMatch, MessageContext messageContext) throws APIManagementException;
}
