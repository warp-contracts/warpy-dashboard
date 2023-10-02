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
  values: { name: string; value: string }[];
  valueSymbol?: string;
}

const Card: ParentComponent<CardProps> = (props) => {
  return (
    <Container class='card__container'>
      <Row class='justify-content-center'>
        <Col class='card__container__header' md={{ span: 8 }}>
          {props.header}
        </Col>
      </Row>
      {props.score && (
        <Row class='score'>
          <Col class='d-flex justify-content-center'>
            <Row class='align-items-center'>
              <Col>78233</Col>
              <Col class='d-flex'>
                <img src={props.scoreIcon} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {props.tableName && (
        <Row class='rewards__title'>
          <Col class='d-flex justify-content-center'>Latest rewards</Col>
        </Row>
      )}
      <Table responsive='sm' class='table'>
        <tbody>
          {props.values.map((v) => (
            <tr class='table__row'>
              <td class='align-middle'>
                <img src={props.tableIcon}></img>
              </td>
              <td class='table__timestamp align-middle'>
                <div>{v.name}</div>
              </td>
              <td class='table__score align-middle'>
                <img src={props.valueSymbol} />
                <span class='table__points align-middle'>{v.value}</span>
                {props.valueIcon && <img width={20} src={props.valueIcon} />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div class='table__more'>Show more</div>
    </Container>
  );
};

export default Card;
