import { Col, Container, Row, Spinner, Table } from 'solid-bootstrap';
import { Component, Show } from 'solid-js';
import './RowTable.scss';

interface RowTableProps {
  values: {
    lp: number;
    address: string;
    discordHandle: string;
    points: number;
    roles: number;
  }[];
  tableIcon: string;
  pointsIcon: string;
  header: string;
  loading: boolean;
  walletAddress: string | null;
  disabledValue?: string;
}

const template = Array(15).fill({
  address: '0sx...827',
  discordHandle: '@goalkeeperwhitelisted',
  points: 153833,
  rewards: { points: '', nft: 'TBA' },
});
const RowTable: Component<RowTableProps> = (props) => {
  return (
    <Container fluid class="row-table">
      <Row class="justify-content-center card__container__row-header">
        <Col class="card__container__header" md={{ span: 4 }}>
          {props.header}
        </Col>
      </Row>
      <Row>
        <div class="row-table__switch">All Time</div>
      </Row>
      <Table responsive="sm">
        <thead>
          <tr class="table__headers">
            <th class="right">Lp.</th>
            <th>Address</th>
            <th>Discord</th>
            <th>Roles</th>
            <th class="right">RSG</th>
          </tr>
        </thead>
        <tbody class={`table__body`}>
          <Show
            when={props.values && props.values.length > 0 && !props.loading}
            fallback={
              <>
                <Spinner animation="border" role="status" class="table__spinner">
                  <span class="visually-hidden">Loading...</span>
                </Spinner>
                {template.map((v) => (
                  <>
                    <tr class={`table__row table__row${!props.values || props.loading ? '--blurred' : ''}`}>
                      <td class="table__lp align-middle">
                        <span class="align-middle">{v.lp}</span>
                      </td>
                      <td class="table__address align-middle">
                        <span class="align-middle">{v.address}</span>
                      </td>
                      <td class="table__discord-handle align-middle">
                        <div>{v.discordHandle}</div>
                      </td>
                      <td class="align-middle">
                        <span class="table__rsg__points align-middle">{v.roles}</span>
                      </td>
                      <td class="table__rsg align-middle">
                        <span class="table__rsg__points align-middle">{v.points}</span>
                        <img class="align-middle" height={20} src={props.pointsIcon} />
                      </td>
                    </tr>
                  </>
                ))}
              </>
            }
          >
            {props.values.map((v) => (
              <tr
                class={`table__row table__row--space ${
                  props.walletAddress?.toLowerCase() == v.address.toLowerCase() ? 'table__row--highlighted' : ''
                }`}
              >
                <td class="table__lp align-middle">
                  <span
                    class={`align-middle ${props.walletAddress?.toLowerCase() == v.address.toLowerCase() && 'bold'}`}
                  >
                    {v.lp}
                  </span>
                </td>
                <td class="table__address align-middle">
                  <span
                    class={`align-middle ${props.walletAddress?.toLowerCase() == v.address.toLowerCase() && 'bold'}`}
                  >
                    {v.address.substr(0, 3) + '...' + v.address.substr(v.address.length - 3)}
                  </span>
                </td>
                <td class="table__discord-handle align-middle">
                  <div class={`${props.walletAddress?.toLowerCase() == v.address.toLowerCase() && 'bold'}`}>
                    {v.discordHandle}
                  </div>
                </td>
                <td class="align-middle">
                  <span class="table__rsg__points align-middle">{v.roles}</span>
                </td>
                <td class="table__rsg align-middle">
                  <span class="table__rsg__points align-middle">{v.points}</span>
                  <img class="align-middle" height={20} src={props.pointsIcon} />
                </td>
              </tr>
            ))}
          </Show>
        </tbody>
      </Table>
    </Container>
  );
};

export default RowTable;
