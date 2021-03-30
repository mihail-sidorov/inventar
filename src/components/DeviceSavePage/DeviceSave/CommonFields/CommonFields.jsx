import React from 'react';
import { Field } from 'redux-form';
import isEmptyObject from '../../../../functions/isEmptyObject';
import { required } from '../../../../validators/validators';
import Input from '../../../common/FormControls/Input';
import Select from '../../../common/FormControls/Select';

let CommonFields = (props) => {
    let optionsResponsibles = [];
    let optionsBrands = [];
    let optionsSuppliers = [];
    let optionsLocations = [];

    for (let id in props.responsibles) {
        optionsResponsibles.push(<option value={id} key={id}>{props.users[id].full_name}</option>);
    }

    for (let id in props.brands) {
        optionsBrands.push(<option value={id} key={id}>{props.brands[id].brand}</option>);
    }

    for (let id in props.suppliers) {
        optionsSuppliers.push(<option value={id} key={id}>{props.suppliers[id].supplier}</option>);
    }

    for (let id in props.locations) {
        optionsLocations.push(<option value={id} key={id}>{props.locations[id].location}</option>);
    }

    return(
        <>
            {
                !isEmptyObject(props.category) && props.category.sub_devices !== null ?
                <>
                    <Field name="user_id" desc="Ответственный на складе" component={Select} validate={[required]}>
                        <option></option>
                        {optionsResponsibles}
                    </Field>
                    <Field name="location_id" desc="Местонахождение" component={Select} validate={[required]}>
                        <option></option>
                        {optionsLocations}
                    </Field>
                    <Field name="comments" desc="Комментарии" type="text" component={Input} />
                </>
                :
                <>
                    <Field name="SN" desc="Серийный номер" type="text" component={Input} />
                    <Field name="order_number" desc="Номер заказа" type="text" component={Input} />
                    <Field name="model" desc="Модель" type="text" component={Input} validate={[required]} />
                    <Field name="price" desc="Закупочная цена" type="text" component={Input} validate={[required]} />
                    <Field name="date_purchase" desc="Дата покупки" type="date" component={Input} validate={[required]} />
                    <Field name="date_warranty_end" desc="Дата окончания гарантии" type="date" component={Input} validate={[required]} />
                    <Field name="brand_id" desc="Марка" component={Select} validate={[required]}>
                        <option></option>
                        {optionsBrands}
                    </Field>
                    <Field name="supplier_id" desc="Поставщик" component={Select} validate={[required]}>
                        <option></option>
                        {optionsSuppliers}
                    </Field>
                    <Field name="user_id" desc="Ответственный на складе" component={Select} validate={[required]}>
                        <option></option>
                        {optionsResponsibles}
                    </Field>
                    <Field name="location_id" desc="Местонахождение" component={Select} validate={[required]}>
                        <option></option>
                        {optionsLocations}
                    </Field>
                    <Field name="comments" desc="Комментарии" type="text" component={Input} />
                </>
            }
            
        </>
    );
}

export default CommonFields;