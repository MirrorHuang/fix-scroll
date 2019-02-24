import { storiesOf, configure, action } from '@storybook/react';
import React from 'react';
const rName = /^\.\/([-\w]+)/;
const req = require.context(
    '../example',
    true,
    /^\.\/(([-\w]+\/index\.jsx)|([-\w]+\.jsx))$/
);

const stories = [];
req.keys().forEach(name => {
    const mod = req(name);
    let Apps = mod.App || mod.Apps || mod.default;
    if (Apps) {
        Apps = Array.isArray(Apps) ? Apps : [Apps];
        const Title = mod.Title || mod.title || rName.exec(name)[1];
        stories.push({ Title, Apps });
    }
});

function loadStories() {
    stories.forEach(story => {
        const s = storiesOf(story.Title, module);
        story.Apps.forEach(App => {
            const title = App.Title || App.title || App.name || 'default';
            s.add(title, () => <App action={action} />);
        });
    });
}

configure(loadStories, module);