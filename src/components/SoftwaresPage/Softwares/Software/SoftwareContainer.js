import { connect } from 'react-redux';
import Software from './Software';

let SoftwareContainer = (id) => {
    return connect(
        state => ({
            software: state.softwaresState.softwares[id],
            categories: state.softwareCategoriesState.softwareCategories,
        }),
        dispatch => ({
            onGoToSoftwareCard: (props) => {
                props.history.push(`/softwares/card/${props.software.id}`);
            },
        })
    )(Software);
}

export default SoftwareContainer;