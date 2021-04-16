import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import isEmptyObject from '../../functions/isEmptyObject';
import { softwareCategoriesGetActionCreator } from '../../redux/softwareCategoriesReducer';
import { softwaresPost, softwaresPostActionCreator } from '../../redux/softwaresReducer';
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
                    softwareData.spec = {};

                    for (let prop in category.schema.properties) {
                        if (!softwareData[`specifications_${prop}`]) {
                            specificationsFields = false;
                            break;
                        }
                        else {
                            softwareData.spec[prop] = softwareData[`specifications_${prop}`];
                        }
                    }

                    if (specificationsFields) {
                        softwaresPost(softwareData)
                            .then(res => {
                                dispatch(softwaresPostActionCreator(res.data));
                            })
                            .catch(console.log);
                    }
                }
            }
        },
        softwareCategoriesGet: data => {
            dispatch(softwareCategoriesGetActionCreator(data));
        },
        resetForm: () => {
            dispatch(initialize('softwareAddForm', {}));
        },
    })
)(SoftwarePageAdd);

export default SoftwarePageAddContainer;