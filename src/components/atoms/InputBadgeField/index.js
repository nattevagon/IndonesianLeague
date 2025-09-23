import { useState } from "react";

const InputBadgesField = ({
  name,
  initial = [],
  suggestions = [],
  placeholder = "Add a tag and press Enter",
  onChange,
}) => {
  const [tags, setTags] = useState(initial);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  console.log('tags', tags);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      handleTagsChange(updatedTags);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    handleTagsChange(updatedTags);
  };

  const handleTagsChange = (updatedTags) => {
    if (onChange) {
      onChange({ target: { name, value: updatedTags } });
    }
  };

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(s)
  );

  return (
    <div className="relative w-full">
      {/* Wrapper Input + Tags */}
      <div className="flex flex-wrap items-center gap-2 w-full h-auto text-[16px] p-2 input input-bordered bg-secondary-white dark:bg-secondary-black rounded-none border-third-white dark:border-third-black cursor-text">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center bg-primary-blue text-primary-white text-sm px-2 py-1"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-1 text-xs text-primary-white hover:text-third-white focus:outline-none"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-none focus:ring-0 outline-none placeholder-third-black dark:placeholder-third-white"
        />
      </div>

      {/* Suggestion Dropdown */}
      {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-primary-white dark:bg-secondary-black border border-third-white dark:border-third-black shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredSuggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => addTag(s)}
              className="px-3 py-2 hover:bg-primary-blue hover:text-primary-white cursor-pointer"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputBadgesField;