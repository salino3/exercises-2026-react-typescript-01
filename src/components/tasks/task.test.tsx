import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskManager } from "./tasks.component";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
