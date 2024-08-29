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
      <Row class="justify-content-center card__container__row-header pb-4">
        <Col class="card__container__header" md={{ span: 4 }}>
          {props.header}
        </Col>
      </Row>
      <Table responsive="sm" class="pt-5">
        <thead>
          <tr class="table__headers">
            <th class="right">Lp.</th>
            <th>Address</th>
            <th>Discord</th>
            <th>
              <div class="d-flex align-items-center">
                <div>Roles</div>
                <div class="table__tooltip">
                  <img class="table__tooltip__icon" height="17" width="17" src="/assets/question-mark.svg" />
                  <span class="table__tooltip__text">
                    These are special roles that have special significance in the RedStone Expedition. You can find out
                    what roles are considered special{' '}
                    <a
                      href="https://redstone-finance.notion.site/RedStone-Community-Guidebook-282d9d43e6b74bb0a275dfa0bafa8548"
                      target="__blan"
                    >
                      here
                    </a>
                    .
                  </span>
                </div>
              </div>
            </th>
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
