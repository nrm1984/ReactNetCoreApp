import React from "react";

const Paginator = props => (
    <nav aria-label="Page navigation example">
        <ul className="pagination">
            <li
                className={`page-item ${
                    !props.paginatorData.has_previous_page ? "disabled" : ""
                    }`}
            >
                <button className={`page-link`} aria-label="First" onClick={event => {
                    event.preventDefault();
                    props.onPaginate(props.paginatorData.first_page);
                }} >Inicio</button>

            </li>
            <li
                className={`page-item ${
                    !props.paginatorData.has_previous_page ? "disabled" : ""
                    }`}
            >
                <button className={`page-link`} aria-label="Previous" onClick={event => {
                    event.preventDefault();
                    props.onPaginate(props.paginatorData.previous_page);
                }} >Ant.</button>

            </li>
            {props.pages.map((page, index) => (
                <li
                    key={index}
                    className={`page-item ${
                        props.paginatorData.current_page === page ? "active" : ""
                        } ${
                        (!props.paginatorData.has_previous_page &&
                            !props.paginatorData.has_next_page) || props.paginatorData.current_page === page
                            ? "disabled"
                            : ""
                        }`}
                >
                    <button className={`page-link`}
                        onClick={event => {
                            event.preventDefault();
                            props.onPaginate(page);
                        }}>
                        {page}
                    </button>

                </li>
            ))}
            <li
                className={`page-item ${
                    !props.paginatorData.has_next_page ? "disabled" : ""
                    }`}
            >
                <button className={`page-link`} aria-label="Next" onClick={event => {
                    event.preventDefault();
                    props.onPaginate(props.paginatorData.next_page);
                }} >Sig.</button>

            </li>
            <li
                className={`page-item ${
                    !props.paginatorData.has_next_page ? "disabled" : ""
                    }`}
            >
                <button className={`page-link`} aria-label="Last" onClick={event => {
                    event.preventDefault();
                    props.onPaginate(props.paginatorData.last_page);
                }} >Último</button>

            </li>
        </ul>
    </nav>
);

export default Paginator;