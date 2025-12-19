'use client'

export default function EditableResume({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      className="border rounded-xl bg-white p-6 shadow-sm focus:outline-none"
    >
      {children}
    </div>
  )
}
