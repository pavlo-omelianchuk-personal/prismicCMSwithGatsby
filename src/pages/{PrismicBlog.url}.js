import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { linkResolver } from '../utils/LinkResolver'
import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { SliceZone } from '../components/SliceZone'

const BlogTemplate = ({ data }) => {
  if (!data) return null
  const doc = data.prismicBlog
console.log(data)
  return (
    <Layout>
      <Seo title={doc.data.document_display_namebbb.text} />
      <SliceZone sliceZone={doc.data.body} />
    </Layout>
  )
}

export const query = graphql`
  query BlogQuery($id: String) {
    prismicBlog(id: { eq: $id }) {
      _previewable
      data {
        document_display_namebbb {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...BlogDataBodyText
          ...BlogDataBodyQuote
          ...BlogDataBodyFullWidthImage
          ...BlogDataBodyImageGallery
          ...BlogDataBodyImageHighlight
        }
      }
    }
  }
`

export default withPrismicPreview(BlogTemplate, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])