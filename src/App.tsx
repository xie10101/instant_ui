import Card from './components/Card';
export default function App() {
  return (
    <div>
      <Card title="My Card">
        <Card.Content>
          <p>
            This is the content of the card.
            <span>This is a span element.</span>
            <strong>This is a strong element.</strong>
            <em>This is an em element.</em>
            <a href="#">This is a link.</a>s
          </p>
        </Card.Content>
        <Card.Footer>
          footer
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </Card.Footer>
      </Card>
    </div>
  );
}
