import { Col, Container, Row, Table } from 'solid-bootstrap';
import { Component } from 'solid-js';
import './RowTable.scss';
import RadioSwitch from '../RadioSwitch/RadioSwitch';

interface RowTableProps {
  values: { address: string; discordHandle: string; points: number; rewards: { points: string; nft: string } }[];
  tableIcon: string;
  pointsIcon: string;
  header: string;
  radios: { name: string; value: string }[];
  radioValue: () => string;
  setRadioValue: (v: string | ((prev?: string) => string)) => string;
}

const RowTable: Component<RowTableProps> = (props) => {
  return (
    <Container fluid class='row-table'>
      <Row class='justify-content-center'>
        <Col class='card__container__header' md={{ span: 4 }}>
          {props.header}
        </Col>
      </Row>
      <Row>
        <Col class='row-table__switch'>
          <RadioSwitch radios={props.radios} radioValue={props.radioValue} setRadioValue={props.setRadioValue} />
        </Col>
      </Row>
      <Table responsive='sm'>
        <thead>
          <tr class='table__headers'>
            <th>Address</th>
            <th>Discord</th>
            <th class='right'>RSCP</th>
            <th class='right'>Rewards</th>
          </tr>
        </thead>
        <tbody>
          {props.values.map((v) => (
            <tr class='table__row table__row--space'>
              <td class='table__address align-middle'>
                <img src={props.tableIcon}></img>
                <span class='align-middle'>{v.address}</span>
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
