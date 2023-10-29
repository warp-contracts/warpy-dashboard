import { Col, Container, Row, Spinner, Table } from 'solid-bootstrap';
import { Component, Show } from 'solid-js';
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
  loading: boolean;
  link: string;
}

const template = Array(15).fill({
  address: '0sx...827',
  discordHandle: '@goalkeeperwhitelisted',
  points: 153833,
  rewards: { points: '', nft: 'TBA' },
});
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
        <tbody class={`table__body`}>
          <Show
            when={props.values && props.values.length > 0 && !props.loading}
            fallback={
              <>
                <Spinner animation='border' role='status' class='table__spinner'>
                  <span class='visually-hidden'>Loading...</span>
                </Spinner>
                {template.map((v) => (
                  <>
                    <tr class={`table__row table__row${!props.values || props.loading ? '--blurred' : ''}`}>
                      <td class='table__address align-middle'>
                        <a href={props.link}>
                          <img src={props.tableIcon}></img>
                        </a>
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
                        {v.rewards.points && <img height={20} src={props.pointsIcon} />}
                        <span class='table__rewards__nft align-middle'>
                          {v.rewards.points && <span>, </span>} {v.rewards.nft}
                        </span>
                      </td>
                    </tr>
                  </>
                ))}
              </>
            }
          >
            {props.values.map((v) => (
              <tr class='table__row table__row--space'>
                <td class='table__address align-middle'>
                  <a href={props.link} target='__blank'>
                    <img src={props.tableIcon}></img>
                  </a>
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
                  {v.rewards.points && <img height={20} src={props.pointsIcon} />}
                  <span class='table__rewards__nft align-middle'>
                    {v.rewards.points && <span>, </span>} {v.rewards.nft}
                  </span>
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
