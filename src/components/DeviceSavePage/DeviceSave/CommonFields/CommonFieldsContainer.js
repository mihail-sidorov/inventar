import { connect } from 'react-redux';
import CommonFields from './CommonFields';

let CommonFieldsContainer = connect(
    state => ({
        category: state.deviceSavePageState.category,
        responsibles: state.responsiblesState.responsibles,
        brands: state.brandsState.brands,
        suppliers: state.suppliersState.suppliers,
        locations: state.locationsState.locations,
        users: state.usersState.users,
    })
)(CommonFields);

export default CommonFieldsContainer;