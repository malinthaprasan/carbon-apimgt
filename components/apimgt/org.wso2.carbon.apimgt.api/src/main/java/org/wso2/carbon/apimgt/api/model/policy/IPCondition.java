/*
*  Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*  WSO2 Inc. licenses this file to you under the Apache License,
*  Version 2.0 (the "License"); you may not use this file except
*  in compliance with the License.
*  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

package org.wso2.carbon.apimgt.api.model.policy;

public class IPCondition extends Condition {
    private String startingIP;
    private String endingIP;
    private String specificIP;

    public String getStartingIP() {
        return startingIP;
    }

    public void setStartingIP(String startingIP) {
        this.startingIP = startingIP;
    }

    public String getEndingIP() {
        return endingIP;
    }

    public void setEndingIP(String endingIP) {
        this.endingIP = endingIP;
    }

    public String getSpecificIP() {
        return specificIP;
    }

    public void setSpecificIP(String specificIP) {
        this.specificIP = specificIP;
    }
}
