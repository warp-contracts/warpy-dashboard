import { Col, Container, Row, Table } from 'solid-bootstrap';
import { Component } from 'solid-js';
import './RowTable.scss';

interface RowTableProps {
  values: { address: string; discordHandle: string; points: number; rewards: { points: string; nft: string } }[];
  tableIcon: string;
  pointsIcon: string;
  header: string;
}

const RowTable: Component<RowTableProps> = (props) => {
  return (
    <Container fluid class='row-table'>
      <Row class='justify-content-center'>
        <Col class='card__container__header' md={{ span: 4 }}>
          {props.header}
        </Col>
      </Row>
      <Table responsive='sm' class='mt-5'>
        <thead>
          <tr class='table__headers'>
            <th></th>
            <th>Address</th>
            <th>Discord</th>
            <th class='right'>RSCP</th>
            <th class='right'>Rewards</th>
          </tr>
        </thead>
        <tbody>
          {props.values.map((v) => (
            <tr class='table__row'>
              <td class='align-middle'>
                <img src={props.tableIcon}></img>
              </td>
              <td class='table__address align-middle'>
                <div>{v.address}</div>
              </td>
              <td class='table__discord-handle align-middle'>
                <div>{v.discordHandle}</div>
              </td>
              <td class='table__rscp align-middle'>
                <span class='table__rscp__points align-middle'>{v.points}</span>
                <img class='align-middle' height={20} src={props.pointsIcon} />
              </td>
              <td class='table__rewards align-middle'>
                <span class='table__rewards__points align-middle'>{v.rewards.points}</span>
                <img height={20} src={props.pointsIcon} />
                <span class='table__rewards__nft align-middle'>, {v.rewards.nft}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RowTable;
