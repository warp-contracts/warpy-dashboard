import { Col, Container, Row, Table } from 'solid-bootstrap';
import { ParentComponent } from 'solid-js';
import './Card.scss';

interface CardProps {
  header: string;
  tableName?: string;
  score?: number;
  scoreIcon?: string;
  tableIcon: string;
  valueIcon?: string;
  values: { name: string; value: any; link?: string; valueSymbol?: string }[] | undefined | null;
  valueSymbol?: string;
  blurred: boolean;
}

const Card: ParentComponent<CardProps> = (props) => {
  return (
    <Container class={`card__container ${props.blurred ? 'blurred' : ''}`}>
      <Row class="justify-content-center card__container__row-header">
        <Col class="card__container__header" md={{ span: 8 }}>
          {props.header}
        </Col>
      </Row>
      {props.score && (
        <Row class="score">
          <Col class="d-flex justify-content-center">
            <Row class="align-items-center">
              <Col>{props.score}</Col>
              <Col class="d-flex">
                <img src={props.scoreIcon} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {props.tableName && (
        <Row class="rewards__title">
          <Col class="d-flex justify-content-center">Latest rewards</Col>
        </Row>
      )}
      <Table responsive="sm" class="table mb-5">
        <tbody>
          {props.values &&
            props.values.map((v) => (
              <tr class="table__row">
                <td class="align-middle">
                  {v.link ? (
                    <a href={v.link} target="_blank">
                      <img src={props.tableIcon} />
                    </a>
                  ) : (
                    <img src={props.tableIcon} />
                  )}
                </td>
                <td class="table__timestamp align-middle">
                  <div>{v.name}</div>
                </td>
                <td class="table__score align-middle">
                  <img src={v.valueSymbol || props.valueSymbol} />
                  <span class="table__points align-middle">{v.value}</span>
                  {props.valueIcon && <img width={20} src={props.valueIcon} />}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Card;
