import React, { Component } from "react";
import { connect } from "react-redux";
import { eventListSelector, moduleName, fetchLazy, selectEvent } from "../../ducks/events";
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css'
import Trash from "./Trash";
import TableRow from "./TableRow";

export class EventList extends Component {

  componentDidMount() {
    this.props.fetchLazy();
  }

  render() {
    const { loaded, events } = this.props;

    return (
      <div>
        <Trash />
        <InfiniteLoader
          loadMoreRows={this.loadMoreRows}
          isRowLoaded={this.isRowLoaded}
          rowCount={loaded ? events.length : events.length + 1}
        >
          {({ onRowsRendered, registerChild }) =>
            <Table
              ref={registerChild}
              rowCount={events.length}
              rowGetter={this.rowGetter}
              overscanRowCount={5}
              rowHeight={40}
              headerHeight={50}
              width={500}
              height={300}
              onRowClick={this.handleRowClick}
              onRowsRendered={onRowsRendered}
              rowRenderer={this.rowRenderer}
            >
              <Column
                label="title"
                width={200}
                dataKey="title" />
              <Column
                label="where"
                width={200}
                dataKey="where" />
              <Column
                label="month"
                width={100}
                dataKey="month" />
            </Table>
          }
        </InfiniteLoader>
      </div>
    );
  }

  isRowLoaded = ({ index }) => {
    return index < this.props.events.length;
  };

  rowRenderer = (rowCtx) => {
    return <TableRow {...rowCtx} />
  };

  loadMoreRows = () => {
    console.log('-->', 'load more')
    this.props.fetchLazy();
  };

  rowGetter = ({ index }) => {
    return this.props.events[index];
  };

  handleRowClick = ({rowData}) => {
    const { selectEvent } = this.props;
    selectEvent && selectEvent(rowData.uid)
  }
}


export default connect(state => ({
  events: eventListSelector(state),
  loading: state[moduleName].loading
}), { fetchLazy, selectEvent })(EventList);