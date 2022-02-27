package com.example.controller

import org.junit.jupiter.api.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.graphql.test.tester.GraphQlTester

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
internal class PokedexControllerTest {

    @Autowired
    lateinit var graphQlTester: GraphQlTester

    @BeforeEach
    fun setUp() {}

    @AfterEach
    fun tearDown() {}

    // TODO: Remaining test cases
}