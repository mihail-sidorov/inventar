import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { softwareCategoriesGetActionCreator } from '../../redux/softwareCategoriesReducer';
import { makeShortSoftwaresActionCreator, shortSoftwaresIsLastPageSetActionCreator } from '../../redux/softwaresPageReducer';
import { softwaresGetActionCreator, softwaresPost, softwaresPostActionCreator } from '../../redux/softwaresReducer';
import SoftwarePageAdd from './SoftwarePageAdd';

let SoftwarePageAddContainer = connect(
    state => ({
        softwareCategories: state.softwareCategoriesState.softwareCategories,
    }),
    dispatch => ({
        onSubmit: (values, props) => {
            if (values.software_category_id) {
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
                        softwaresPost(softwareData)
                            .then(res => {
                                dispatch(softwaresPostActionCreator(res.data));
                                dispatch(shortSoftwaresIsLastPageSetActionCreator());
                                dispatch(makeShortSoftwaresActionCreator());
                                props.history.push('/softwares');
                            })
                            .catch((error) => {
                                dispatch({
                                    type: 'SOFTWARE_ADD_FORM_VALIDATE',
                                    errors: error.response.data.message,
                                });
                            });
                    }
                }
            }
        },
        softwaresSet: data => {
            dispatch(softwaresGetActionCreator(data));
        },
        softwareCategoriesSet: data => {
            dispatch(softwareCategoriesGetActionCreator(data));
        },
        resetForm: () => {
            dispatch(initialize('softwareAddForm', {}));
        },
    })
)(SoftwarePageAdd);

export default SoftwarePageAddContainer;