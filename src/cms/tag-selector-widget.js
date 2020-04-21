import _ from 'lodash';
import React from 'react';
import CMS from 'netlify-cms-app';
import Immutable from 'immutable';
import { useStaticQuery, graphql } from "gatsby"


const TagSelectorWidget = props => {
  const SelectControl = CMS.getWidget("select").control;
  const selectProps = { ...props };

  const data = useStaticQuery(graphql`
    query TagSelectorQuery {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
      }
  `);

  let tags = [];
  data.allMarkdownRemark.edges.forEach(edge => {
    if (_.get(edge, `node.frontmatter.tags`)) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  tags = _.uniq(tags)

  let tagsList = Immutable.List(tags);

  selectProps.field = selectProps.field.set('options', tagsList);
  return (
    <div>
      <SelectControl {...selectProps} />
    </div>
  );
};

export default TagSelectorWidget;