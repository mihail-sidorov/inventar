import React from 'react';

let Pagination = (props) => {
    let onChangePage = (e) => {
        props.changePage(Number(e.currentTarget.getAttribute('page')));
    }

    let onNextPage = () => {
        props.changePage(props.currentPage + 1);
    }

    let onPrevPage = () => {
        props.changePage(props.currentPage - 1);
    }

    let pages = [];
    let activeCurrentPage;
    let first;
    let prev;
    let next;
    let onScreenCount = 4;
    let limit = 0;

    if (props.currentPage > 1) {
        first = (
            <span className="pagination__first"
                onClick={() => {
                    props.changePage(1);
                }}
            ></span>
        );
        prev = <span className="pagination__prev" onClick={onPrevPage}></span>;
    }
    if (props.currentPage < props.pages) {
        next = <span className="pagination__next" onClick={onNextPage}></span>;
    }

    for (let i = 1; i <= props.pages; i++) {
        if (i === props.currentPage) {
            activeCurrentPage = ' pagination__page_active';
        }
        else {
            activeCurrentPage = '';
        }

        if ((onScreenCount !== 1) && (props.pages - onScreenCount !== 1)) {
            if (i === props.currentPage || i === props.pages) {
                pages.push(<a href="#" className={`pagination__page${activeCurrentPage}`} key={i} page={i} onClick={onChangePage}>{i}</a>);
                if (i === props.currentPage) {
                    limit++;
                    if ((props.pages - i > 1) && (limit === onScreenCount - 1)) {
                        pages.push(<span key={props.pages + 1}>...</span>);
                    }
                }
            }
            else if (limit < onScreenCount - 1) {
                let verge;
                if (props.pages === props.currentPage) {
                    verge = onScreenCount - 1;
                }
                else {
                    verge = onScreenCount - 2;
                }
    
                if (Math.abs(i - props.currentPage) <= verge) {
                    pages.push(<a href="#" className={`pagination__page${activeCurrentPage}`} key={i} page={i} onClick={onChangePage}>{i}</a>);
                    limit++;
                    if ((props.pages - i > 1) && (limit === onScreenCount - 1)) {
                        pages.push(<span key={props.pages + 1}>...</span>);
                    }
                }
            }
        }
        else {
            pages.push(<a href="#" className={`pagination__page${activeCurrentPage}`} key={i} page={i} onClick={onChangePage}>{i}</a>);
        }
    }

    return (
        (props.pages > 1) && <div className="pagination">
            {first}
            {prev}
            <span className="pagination__pages">
                {pages}
            </span>
            {next}
        </div>
    );
}

export default Pagination;