import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { softwareCategoriesGetActionCreator } from '../../redux/softwareCategoriesReducer';
import { softwaresGetActionCreator, softwaresPatch, softwaresPost, softwaresPostActionCreator } from '../../redux/softwaresReducer';
import SoftwarePageEdit from './SoftwarePageEdit';

let SoftwarePageEditContainer = connect(
    state => ({
        softwareCategories: state.softwareCategoriesState.softwareCategories,
        softwares: state.softwaresState.softwares,
    }),
    dispatch => ({
        onSubmit: (values, props) => {
            let category = props.category;
            
            if (!isEmptyObject(category)) {
                let softwareData = {...values};
                let specificationsFields = true;
                softwareData.specifications = {};

                for (let prop in category.schema.properties) {
                    if (!softwareData[`specifications_${prop}`]) {
                        specificationsFields = false;
                        break;
                    }
                    else {
                        softwareData.specifications[prop] = softwareData[`specifications_${prop}`];
                    }
                }

                if (specificationsFields) {
                    softwaresPatch(softwareData)
                        .then(res => {
                            dispatch(softwaresPostActionCreator(res.data));
                            alert('ПО отредактировано!');
                        })
                        .catch((error) => {
                            dispatch({
                                type: 'SOFTWARE_EDIT_FORM_VALIDATE',
                                errors: error.response.data.message,
                            });
                        });
                }
            }
        },
        softwareCategoriesGet: data => {
            dispatch(softwareCategoriesGetActionCreator(data));
        },
        softwaresGet: data => {
            dispatch(softwaresGetActionCreator(data));
        },
        initialValuesSet: values => {
            dispatch(initialize('softwareEditForm', values));
        },
    })
)(SoftwarePageEdit);

export default SoftwarePageEditContainer;