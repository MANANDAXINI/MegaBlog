import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue} // Pass defaultValue to Controller
        render={({ field: { onChange, value } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime",
                "media", "table", "code", "help", "wordcount", "anchor"
              ],
              toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            value={value} // Use the value from react-hook-form
            onEditorChange={(content) => onChange(content)} // Pass content to onChange
          />
        )}
      />
    </div>
  );
}

// Define prop types
RTE.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};

// Default props
RTE.defaultProps = {
  label: '',
  defaultValue: '',
};
