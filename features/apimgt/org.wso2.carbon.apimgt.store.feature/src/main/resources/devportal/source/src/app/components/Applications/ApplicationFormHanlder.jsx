/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage, injectIntl } from 'react-intl';
import API from 'AppData/api';
import ApplicationCreateForm from 'AppComponents/Shared/AppsAndKeys/ApplicationCreateForm';
import Alert from 'AppComponents/Shared/Alert';
import Settings from 'AppComponents/Shared/SettingsContext';
import Application from 'AppData/Application';
import { Link } from 'react-router-dom';
import ApplicationCreateBase from './Create/ApplicationCreateBase';

/**
 * Component used to handle application creation
 * @class ApplicationFormHanlder
 * @extends {React.Component}
 * @param {any} value @inheritDoc
 */
class ApplicationFormHanlder extends React.Component {
    static contextType = Settings;

    /**
     * @param {*} props properties
     */
    constructor(props) {
        super(props);
        this.state = {
            applicationRequest: {
                name: '',
                throttlingPolicy: '',
                description: '',
                tokenType: 'JWT',
                groups: null,
                attributes: {},
            },
            isNameValid: true,
            throttlingPolicyList: [],
            allAppAttributes: null,
            isApplicationSharingEnabled: true,
            isEdit: false,
        };
        this.handleAddChip = this.handleAddChip.bind(this);
        this.handleDeleteChip = this.handleDeleteChip.bind(this);
    }

    /**
     * Get all the throttling Policies from backend and
     * update the state
     * @memberof ApplicationFormHanlder
     */
    componentDidMount() {
        const { match: { params } } = this.props;
        if (params.application_id) {
            this.initiApplicationEditState(params.application_id);
        } else {
            this.initApplicationCreateState();
        }
        this.isApplicationGroupSharingEnabled();
    }

    /**
     * @param {object} name application attribute name
     * @returns {Object} attribute value
     * @memberof ApplicationFormHanlder
     */
    getAttributeValue = (name) => {
        const { applicationRequest } = this.state;
        return applicationRequest.attributes[name];
    };

    /**
     * Initilaize the component if it is in applicatioin edit state
     * @param {String} applicationId application id
     * @memberof ApplicationFormHanlder
     */
    initiApplicationEditState = (applicationId) => {
        const { applicationRequest } = this.state;
        const promisedApplication = Application.get(applicationId);
        // Get all the tires to populate the drop down.
        const api = new API();
        const promiseTiers = api.getAllTiers('application');
        const promisedAttributes = api.getAllApplicationAttributes();
        Promise.all([promisedApplication, promiseTiers, promisedAttributes])
            .then((response) => {
                const [application, tierResponse, allAttributes] = response;
                const throttlingPolicyList = tierResponse.body.list.map(item => item.name);
                const allAppAttributes = allAttributes.body.list;
                const newRequest = { ...applicationRequest };
                newRequest.applicationId = application.applicationId;
                newRequest.name = application.name;
                newRequest.throttlingPolicy = application.throttlingPolicy;
                newRequest.description = application.description;
                newRequest.groups = application.groups;
                newRequest.tokenType = application.tokenType;
                newRequest.attributes = application.attributes;
                this.setState({
                    isEdit: true, applicationRequest: newRequest, throttlingPolicyList, allAppAttributes,
                });
            })
            .catch((error) => {
                console.log(error);
                const { status } = error;
                if (status === 404) {
                    // eslint-disable-next-line react/no-unused-state
                    this.setState({ notFound: true });
                }
            });
        this.isApplicationGroupSharingEnabled();
    }
    /**
     * Used to initialize the component state
     * @memberof ApplicationFormHanlder
     */
    initApplicationCreateState = () => {
        // Get all the tiers to populate the drop down.
        const api = new API();
        const promiseTiers = api.getAllTiers('application');
        const promisedAttributes = api.getAllApplicationAttributes();
        Promise.all([promiseTiers, promisedAttributes])
            .then((response) => {
                const [tierResponse, allAttributes] = response;
                const { applicationRequest } = this.state;
                const throttlingPolicyList = tierResponse.body.list.map(item => item.name);
                const newRequest = { ...applicationRequest };
                if (throttlingPolicyList.length > 0) {
                    [newRequest.throttlingPolicy] = throttlingPolicyList;
                }
                const allAppAttributes = [];
                allAttributes.body.list.map(item => allAppAttributes.push(item));
                if (allAttributes.length > 0) {
                    newRequest.attributes = allAppAttributes.filter(item => !item.hidden);
                }
                this.setState({ applicationRequest: newRequest, throttlingPolicyList, allAppAttributes });
            })
            .catch((error) => {
                console.log(error);
                const { status } = error;
                if (status === 404) {
                    // eslint-disable-next-line react/no-unused-state
                    this.setState({ notFound: true });
                }
            });
    }

    /**
     * Update Application Request state
     * @param {Object} applicationRequest parameters requried for application
     */
    updateApplicationRequest = (applicationRequest) => {
        this.setState({ applicationRequest });
    }

    /**
     * @param {object} name application attribute name
     * @returns {void}
     * @memberof ApplicationFormHanlder
     */
    handleAttributesChange = name => (event) => {
        const { applicationRequest } = this.state;
        applicationRequest.attributes[name] = event.target.value;
        this.setState({ applicationRequest });
    };

    /**
     * @param {object} name application attribute name
     * @returns {void}
     * @memberof ApplicationFormHanlder
     */
    isRequiredAttribute = (name) => {
        const { allAppAttributes } = this.state;
        if (allAppAttributes) {
            for (let i = 0; i < allAppAttributes.length; i++) {
                if (allAppAttributes[i].attribute === name) {
                    return allAppAttributes[i].required === 'true';
                }
            }
        }
        return false;
    };

    /**
     * @param {object} attributes application attributes list
     * @returns {object}
     * @memberof EditApp
     */
    validateAttributes = (attributes) => {
        const { intl } = this.props;
        const { allAppAttributes } = this.state;
        let isValidAttribute = true;
        const attributeNameList = Object.keys(attributes);
        if (allAppAttributes.length > 0) {
            for (let i = 0; i < allAppAttributes.length; i++) {
                if (allAppAttributes[i].required === 'true' && allAppAttributes[i].hidden === 'false') {
                    if (attributeNameList.indexOf(allAppAttributes[i].attribute) === -1) {
                        isValidAttribute = false;
                    } else if (attributeNameList.indexOf(allAppAttributes[i].attribute) > -1
                    && (!attributes[allAppAttributes[i].attribute]
                        || attributes[allAppAttributes[i].attribute].trim() === '')) {
                        isValidAttribute = false;
                    }
                }
            }
        }
        if (!isValidAttribute) {
            return Promise.reject(new Error(intl.formatMessage({
                id: 'Applications.Edit.app.update.error.no.required.attribute',
                defaultMessage: 'Please fill all required application attributes',
            })));
        } else {
            return Promise.resolve(true);
        }
    };

    /**
     * Validate and send the application create
     * request to the backend
     * @memberof ApplicationFormHanlder
     */
    saveApplication = () => {
        const { applicationRequest } = this.state;
        const { intl, history } = this.props;
        const api = new API();
        this.validateName(applicationRequest.name)
            .then(() => this.validateAttributes(applicationRequest.attributes))
            .then(() => api.createApplication(applicationRequest))
            .then((response) => {
                console.log('Application created successfully.');
                Alert.info(intl.formatMessage({
                    id: 'Applications.Create.ApplicationFormHanlder.Application.created.successfully',
                    defaultMessage: 'Application created successfully.',
                }));
                const appId = response.body.applicationId;
                history.push(`/applications/${appId}`);
            })
            .catch((error) => {
                const { response } = error;
                if (response && response.body) {
                    const message = response.body.description || intl.formatMessage({
                        defaultMessage: 'Error while creating the application',
                        id: 'Applications.Create.ApplicationFormHanlder.error.while.creating.the.application',
                    });
                    Alert.error(message);
                } else {
                    Alert.error(error.message);
                }
                console.error('Error while creating the application');
            });
    };

    /**
     *  Save edited application
     * @memberof EditApp
     */
    saveEdit = () => {
        const { applicationRequest } = this.state;
        const {
            history, intl,
        } = this.props;
        const api = new API();
        this.validateName(applicationRequest.name)
            .then(() => this.validateAttributes(applicationRequest.attributes))
            .then(() => api.updateApplication(applicationRequest, null))
            .then((response) => {
                const appId = response.body.applicationId;
                history.push(`/applications/${appId}`);
                Alert.info(intl.formatMessage({
                    id: 'Applications.ApplicationFormHanlder.app.updated.success',
                    defaultMessage: 'Application updated successfully',
                }));
                console.log('Application updated successfully.');
            })
            .catch((error) => {
                const { response } = error;
                if (response && response.body) {
                    const message = response.body.description || 'Error while updating the application';
                    Alert.error(message);
                } else {
                    Alert.error(error.message);
                }
                console.error('Error while updating the application');
            });
    };

    validateName = (value) => {
        const { intl } = this.props;
        if (!value || value.trim() === '') {
            this.setState({ isNameValid: false });
            return Promise.reject(new Error(intl.formatMessage({
                id: 'Applications.Create.ApplicationFormHanlder.app.name.required',
                defaultMessage: 'Application name is required',
            })));
        }
        this.setState({ isNameValid: true });
        return Promise.resolve(true);
    };

    /**
     * add a new group function
     * @param {*} chip newly added group
     * @param {*} appGroups already existing groups
     */
    handleAddChip = (chip, appGroups) => {
        const { applicationRequest } = this.state;
        const newRequest = { ...applicationRequest };
        let values = appGroups || [];
        values = values.slice();
        values.push(chip);
        newRequest.groups = values;
        this.setState({ applicationRequest: newRequest });
    }

    /**
     * remove a group from already existing groups function
     * @param {*} chip selected group to be removed
     * @param {*} index selected group index to be removed
     * @param {*} appGroups already existing groups
     */
    handleDeleteChip = (chip, index, appGroups) => {
        const { applicationRequest } = this.state;
        const newRequest = { ...applicationRequest };
        let values = appGroups || [];
        values = values.filter(v => v !== chip);
        newRequest.groups = values;
        this.setState({ applicationRequest: newRequest });
    }

    /**
     * retrieve Settings from the context and check the application sharing enabled
     * @param {*} settingsData required data
     */
    isApplicationGroupSharingEnabled = () => {
        const settingsContext = this.context;
        const enabled = settingsContext.settings.applicationSharingEnabled;
        this.setState({ isApplicationSharingEnabled: enabled });
    }

    /**
     * @inheritdoc
     * @memberof ApplicationFormHanlder
     */
    render() {
        const {
            throttlingPolicyList, applicationRequest, isNameValid, allAppAttributes, isApplicationSharingEnabled,
            isEdit,
        } = this.state;
        const CreatePageTitle = (
            <React.Fragment>
                <Typography variant='h5'>
                    <FormattedMessage
                        id='Applications.Create.ApplicationFormHanlder.create.application.heading'
                        defaultMessage='Create an application'
                    />
                </Typography>
                <Typography variant='caption'>
                    <FormattedMessage
                        id='Applications.Create.ApplicationFormHanlder.create.application.sub.heading'
                        defaultMessage={
                            'Create an application providing name, quota and token type parameters' +
                            ' and optionally description'
                        }
                    />
                </Typography>
            </React.Fragment>
        );
        const EditPageTitle = (
            <React.Fragment>
                <Typography variant='h5'>
                    <FormattedMessage
                        id='Applications.Create.ApplicationFormHanlder.edit.application.heading'
                        defaultMessage='Edit application'
                    />
                </Typography>
                <Typography variant='caption'>
                    <FormattedMessage
                        id='Applications.Create.ApplicationFormHanlder.edit.application.sub.heading'
                        defaultMessage={
                            'Edit this application. Name, quota and token type are madatory parameters' +
                            ' and description is optional'
                        }
                    />
                </Typography>
            </React.Fragment>
        );
        return (
            <ApplicationCreateBase title={isEdit ? EditPageTitle : CreatePageTitle}>
                <Box py={4} display='flex' justifyContent='center'>
                    <Grid item xs={10} md={9}>
                        <ApplicationCreateForm
                            throttlingPolicyList={throttlingPolicyList}
                            applicationRequest={applicationRequest}
                            updateApplicationRequest={this.updateApplicationRequest}
                            validateName={this.validateName}
                            isNameValid={isNameValid}
                            allAppAttributes={allAppAttributes}
                            handleAttributesChange={this.handleAttributesChange}
                            isRequiredAttribute={this.isRequiredAttribute}
                            getAttributeValue={this.getAttributeValue}
                            isApplicationSharingEnabled={isApplicationSharingEnabled}
                            handleDeleteChip={this.handleDeleteChip}
                            handleAddChip={this.handleAddChip}
                        />
                        <Box display='flex' justifyContent='flex-start' mt={4} spacing={1}>
                            <Box>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={isEdit ? this.saveEdit : this.saveApplication}
                                >
                                    <FormattedMessage
                                        id='Applications.Create.ApplicationFormHanlder.save'
                                        defaultMessage='SAVE'
                                    />
                                </Button>
                            </Box>
                            <Box ml={1}>
                                <Link to='/applications/'>
                                    <Button variant='text'>
                                        <FormattedMessage
                                            id='Applications.Create.ApplicationFormHanlder.cancel'
                                            defaultMessage='CANCEL'
                                        />
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </ApplicationCreateBase>
        );
    }
}

ApplicationFormHanlder.propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            application_id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default injectIntl(ApplicationFormHanlder);
