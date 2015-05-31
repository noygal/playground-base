var React = require('react');

var CollapsibleSection = require('./CollapsibleSection.jsx').CollapsibleSection;

export class Layout extends React.Component {
  render() {
    return (
      <div>
        <CollapsibleSection title="This is the title">
          This is the body.<br /><br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat varius est, sed rhoncus felis vehicula non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sit amet arcu malesuada, dapibus mi ac, commodo arcu. Donec at semper nibh. Duis pulvinar sagittis sollicitudin. Morbi mollis nisl tincidunt ligula tincidunt mollis. Nam interdum ligula nec libero ullamcorper, ut sodales lorem lacinia. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec lectus neque, porttitor sed fermentum vitae, tincidunt sed ante. Vestibulum urna sapien, sollicitudin id dolor nec, sagittis venenatis lacus.
        </CollapsibleSection>
      </div>
    );
  }
}
