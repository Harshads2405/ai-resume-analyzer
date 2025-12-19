import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'

type ResumeData = {
  summary: string
  experience: string[]
  projects: string[]
  skills: string[]
}

export default function ResumePDF({
  name,
  data,
}: {
  name: string
  data: ResumeData
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.heading}>Summary</Text>
        <Text>{data.summary}</Text>

        <Text style={styles.heading}>Experience</Text>
        {data.experience.map((item, i) => (
          <Text key={i}>• {item}</Text>
        ))}

        <Text style={styles.heading}>Projects</Text>
        {data.projects.map((item, i) => (
          <Text key={i}>• {item}</Text>
        ))}

        <Text style={styles.heading}>Skills</Text>
        <Text>{data.skills.join(', ')}</Text>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
})
