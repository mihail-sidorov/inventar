import React from 'react';

let EventsPageFilter = (props) => {
    return (
        <div className="events-page-filter">
            <div className="events-page-filter__status">
                <div className="events-page-filter__status-items">
                    <div className={`events-page-filter__status-item${props.filter.status === 'pending' ? ' events-page-filter__status-item_active' : ''}`} status="pending" onClick={(e) => {
                        props.changeStatus(e.currentTarget.getAttribute('status'));
                    }}>Ожидают подтверждения</div>
                    <div className={`events-page-filter__status-item${props.filter.status === 'complete' ? ' events-page-filter__status-item_active' : ''}`} status="complete" onClick={(e) => {
                        props.changeStatus(e.currentTarget.getAttribute('status'));
                    }}>Подтвержденные</div>
                    <div className={`events-page-filter__status-item${props.filter.status === 'reject' ? ' events-page-filter__status-item_active' : ''}`} status="reject" onClick={(e) => {
                        props.changeStatus(e.currentTarget.getAttribute('status'));
                    }}>Отклоненные</div>
                </div>
            </div>
            <div className={`events-page-filter__person${props.filter.person ? ' events-page-filter__person_active' : ''}`} onClick={() => {
                props.changePerson();
            }}>Мои события</div>
        </div>
    );
}

export default EventsPageFilter;