// src/containers/System/Specialty/TableManageSpecialty.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { emitter } from '../../../utils/emitter';

class TableManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyRedux: [],
            currentPage: 1,
            pageSize: 10,
            search: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({ specialtyRedux: this.props.allSpecialty || [] }, () => {
                this.ensureValidPage();
            });
        }
        if (
            prevState.search !== this.state.search ||
            prevState.pageSize !== this.state.pageSize
        ) {
            this.ensureValidPage();
        }
    }

    ensureValidPage = () => {
        const total = this.getFiltered().length;
        const totalPages = Math.max(1, Math.ceil(total / this.state.pageSize));
        if (this.state.currentPage > totalPages) {
            this.setState({ currentPage: totalPages });
        }
    };

    handleDeleteSpecialty = (specialty) => {
        if (!specialty?.id) return;
        this.props.deleteSpecialty(specialty.id);
    };

    handleEditSpecialty = (specialty) => {
        emitter.emit('EVENT_FILL_EDIT_SPECIALTY', specialty);
    };

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value, currentPage: 1 });
    };

    handlePageChange = (page) => {
        if (page < 1) return;
        const totalPages = Math.max(1, Math.ceil(this.getFiltered().length / this.state.pageSize));
        if (page > totalPages) return;
        this.setState({ currentPage: page });
    };

    handlePageSizeChange = (e) => {
        const val = Number(e.target.value) || 10;
        this.setState({ pageSize: val, currentPage: 1 });
    };

    getFiltered = () => {
        const { specialtyRedux, search } = this.state;
        const q = (search || '').toLowerCase().trim();
        if (!q) return specialtyRedux;
        return specialtyRedux.filter((s) => (s?.name || '').toLowerCase().includes(q));
    };

    getPaged = () => {
        const { currentPage, pageSize } = this.state;
        const filtered = this.getFiltered();
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return {
            items: filtered.slice(start, end),
            total: filtered.length,
            startIndex: start,
            totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
        };
    };

    renderPagination(totalPages) {
        const { currentPage } = this.state;
        const pages = [];
        const windowSize = 5;
        let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
        let end = Math.min(totalPages, start + windowSize - 1);
        start = Math.max(1, end - windowSize + 1);

        for (let p = start; p <= end; p += 1) {
            pages.push(
                <li key={p} className={`page-item ${p === currentPage ? 'active' : ''}`}>
                    <button type="button" className="page-link" onClick={() => this.handlePageChange(p)}>
                        {p}
                    </button>
                </li>
            );
        }

        return (
            <nav aria-label="Specialty pagination" className="mt-3">
                <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={() => this.handlePageChange(currentPage - 1)}>
                            «
                        </button>
                    </li>
                    {pages}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={() => this.handlePageChange(currentPage + 1)}>
                            »
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    render() {
        const { search, pageSize } = this.state;
        const thumbStyle = {
            width: 90,
            height: 60,
            objectFit: 'cover',
            borderRadius: 6,
            border: '1px solid #e5e7eb',
        };

        const { items, total, startIndex, totalPages } = this.getPaged();
        const showingFrom = total === 0 ? 0 : startIndex + 1;
        const showingTo = Math.min(startIndex + items.length, total);

        return (
            <div className="table-manage-specialty-wrapper mt-4">
                {/* Controls */}
                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <div className="me-2">
                        <input
                            type="text"
                            className="form-control"
                            value={search}
                            onChange={this.handleSearchChange}
                            placeholder="Tìm theo tên chuyên khoa..."
                            aria-label="Search specialties"
                            style={{ minWidth: 240 }}
                        />
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                        <span className="me-2 text-muted">Hiển thị</span>
                        <select className="form-select" style={{ width: 90 }} value={pageSize} onChange={this.handlePageSizeChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped mb-2">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col" style={{ width: 60 }}>#</th>
                                <th scope="col">Name</th>
                                <th scope="col" style={{ width: 120 }}>Image</th>
                                <th scope="col" style={{ width: 120 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={item.id || `${startIndex}-${idx}`}>
                                    <th scope="row">{startIndex + idx + 1}</th>
                                    <td>{item.name}</td>
                                    <td>
                                        {item.image ? (
                                            <img src={item.image} alt={`${item.name || 'specialty'}-img`} style={thumbStyle} />
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                    <td>
                                        <button type="button" className="btn-edit" title="Edit" onClick={() => this.handleEditSpecialty(item)}>
                                            <i className="fas fa-pencil-alt" />
                                        </button>
                                        <button type="button" className="btn-delete" title="Delete" onClick={() => this.handleDeleteSpecialty(item)}>
                                            <i className="fas fa-trash" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted">No specialties</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted small">{`Hiển thị ${showingFrom}-${showingTo} / ${total}`}</div>
                    {this.renderPagination(totalPages)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allSpecialty: state.admin.allSpecialty,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    deleteSpecialty: (id) => dispatch(actions.deleteSpecialty(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
